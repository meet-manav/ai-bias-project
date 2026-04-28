import streamlit as st
import pandas as pd

st.title("🧠 AI Bias Detection System")

file = st.file_uploader("Upload CSV File")

if file:
    df = pd.read_csv(file)
    st.write("Dataset Preview")
    st.dataframe(df)

    st.success("Bias Analysis Completed (Demo)")
