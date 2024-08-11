import streamlit as st
from llm_chains import load_normal_chain, load_pdf_chat_chain
from langchain_community.chat_message_histories import StreamlitChatMessageHistory
from streamlit_mic_recorder import  speech_to_text
from utils import save_chat_history_json, get_timestamp, load_chat_history_json
import warnings
warnings.filterwarnings("ignore")


from pdf_handler import add_documents_to_db
from html_templates import get_bot_template, get_user_template, css
import yaml
import os
import uuid
import gtts 
import playsound

# load the config file
with open("config.yaml", "r") as f:
    config = yaml.safe_load(f)

# load the chain
def load_chain(chat_history):
    if st.session_state.pdf_chat:
        # print("loading pdf chat chain")
        return load_pdf_chat_chain(chat_history)
    return load_normal_chain(chat_history)

# a function to clear the input field
def clear_input_field():
    st.session_state.user_question = st.session_state.user_input
    st.session_state.user_input = ""

# a function to set the send input flag to true
def set_send_input():
    st.session_state.send_input = True
    # clear the input feild after sending the message
    clear_input_field()


def genrate_audio(text):
    audio = gtts.gTTS(text)
    file_path = f"{uuid.uuid4()}.mp3"
    audio.save(file_path)
    playsound.playsound(file_path)
    os.remove(file_path)

# a function to toggle the pdf chat flag
def toggle_pdf_chat():
    st.session_state.pdf_chat = True

# a function to save the chat history
def save_chat_history():
    if st.session_state.history != []:
        # check if the session is new
        if st.session_state.session_key == "new_session":
            st.session_state.new_session_key = get_timestamp() + ".json"
            # save it as a json file with its current time of creation
            save_chat_history_json(st.session_state.history, config["chat_history_path"] + st.session_state.new_session_key)
        else:
            save_chat_history_json(st.session_state.history, config["chat_history_path"] + st.session_state.session_key)

# the main function
def main():
    # title of the app
    st.title("Service Bot")
    # write the css
    st.write(css, unsafe_allow_html=True)
    # create a container for the chat
    chat_container = st.container()
    # create a sidebar
    st.sidebar.title("Chat Sessions")
    # get the chat sessions
    chat_sessions = ["new_session"] + os.listdir(config["chat_history_path"])

    # create a session key
    if "send_input" not in st.session_state:
        # create a session key
        st.session_state.session_key = "new_session"
        # create a flag to send the input
        st.session_state.send_input = False
        # create a user question
        st.session_state.user_question = ""
        # create a new session key
        st.session_state.new_session_key = None
        # create a session index tracker
        st.session_state.session_index_tracker = "new_session"
    # check if the session key is new
    if st.session_state.session_key == "new_session" and st.session_state.new_session_key != None:
        # set the session key to the new session key
        st.session_state.session_index_tracker = st.session_state.new_session_key
        # set the session key to the new session key
        st.session_state.new_session_key = None

    # get the index of the session key
    index = chat_sessions.index(st.session_state.session_index_tracker)
    st.sidebar.selectbox("Select a chat session", chat_sessions, key="session_key", index=index)
    st.sidebar.toggle("PDF Chat", key="pdf_chat", value=False)

    # check if the session key is new
    if st.session_state.session_key != "new_session":
        st.session_state.history = load_chat_history_json(config["chat_history_path"] + st.session_state.session_key)
    else:
        # create a new history
        st.session_state.history = []

    # get the chat history
    chat_history = StreamlitChatMessageHistory(key="history")

    # create a user input field
    user_input = st.text_input("Type your message here", key="user_input", on_change=set_send_input)

    # create a voice recording and send button
    voice_recording_column, send_button_column = st.columns(2)

    # check if voice recording
    with voice_recording_column:
        voice_recording = speech_to_text(language='en', use_container_width=True, just_once=True, key='STT')
    # check if send button
    with send_button_column:
        send_button = st.button("Send", key="send_button", on_click=clear_input_field)



    # uploaded pdf 
    uploaded_pdf = st.sidebar.file_uploader("Upload a pdf file", accept_multiple_files=True, key="pdf_upload", type=["pdf"], on_change=toggle_pdf_chat)

    if uploaded_pdf:
        with st.spinner("Processing pdf..."):
            add_documents_to_db(uploaded_pdf)

    audio_flag = False
    
    # check if voice recording
    if voice_recording is not None:
        
        print(voice_recording)
        audio_flag = True
        # load the chain
        llm_chain = load_chain(chat_history)
        # get the response
        llm_chain.run(voice_recording)

    # check if the send button is clicked
    if send_button or st.session_state.send_input:
        
        # check if the user input is not empty
        if st.session_state.user_question != "":
            # add the user message to the chat history
            llm_chain = load_chain(chat_history)
            # get the response
            llm_response = llm_chain.run(st.session_state.user_question)
            # add the user message to the chat history
            st.session_state.user_question = ""
    # check if the chat history is not empty
    messages_list = []
    if chat_history.messages != []:
        with chat_container:
            st.write("Chat History:")
            for message in chat_history.messages:
                # check if the message is human
                if message.type == "human":
                    # write the user template
                    st.write(get_user_template(message.content), unsafe_allow_html=True)
                else:
                    # write the bot template
                    
                    st.write(get_bot_template(message.content), unsafe_allow_html=True)
                    messages_list.append(message.content)
                    
    if audio_flag:
        genrate_audio(messages_list[-1])
    # save the chat history
    save_chat_history()

# run the main function
if __name__ == "__main__":
    main()