import streamlit as st

st.title("🧠 AI Bias Detection System")

st.write("Upload your dataset to analyze bias in AI models")

file = st.file_uploader("Upload CSV file")

if file:
    st.success("File uploaded successfully!")
