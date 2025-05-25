import gradio as gr
import requests

def call_add_tool(a, b):
    payload = {"a": a, "b": b}
    try:
        res = requests.post("http://localhost:4000/tool/add_numbers", json=payload)
        res.raise_for_status()
        result = res.json()
        return f"🧮 Result: {result.get('result')}"
    except Exception as e:
        return f"❌ Error: {str(e)}"

with gr.Blocks() as demo:
    gr.Markdown("### 🧠 MCP Math UI — Add Two Numbers")
    a = gr.Number(label="Number A")
    b = gr.Number(label="Number B")
    btn = gr.Button("Compute Sum")
    out = gr.Textbox(label="Result")
    
    btn.click(fn=call_add_tool, inputs=[a, b], outputs=out)

demo.launch()
