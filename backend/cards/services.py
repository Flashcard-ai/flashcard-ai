from bs4 import BeautifulSoup
from pydantic_ai import Agent
from dotenv import load_dotenv
import requests
import json

load_dotenv()

def scraping(url: str) -> str:
    response = requests.get(url)
    html = response.text

    soup = BeautifulSoup(html, "html.parser")

    tags = soup.find_all([
                            "p",
                            "h1",
                            "h2",
                            "h3",
                            "h4",
                            "h5",
                            "h6"
                        ])
    
    result: str = ""

    for tag in tags:
        result += str(tag)
    
    return " ".join(result.split())


FLASHCARD_AGENT = Agent(
    "groq:llama-3.3-70b-versatile",
    instructions=f"""
    Você deve pegar o conteúdo que lhe será fornecido e, se nenhum
    número de questões lhe for fornecido, deverás criar 10 questões
    sobre o conteúdo abordado desse prompt. A resposta deve ser somente
    em formato de JSON, onde as chaves devem ser apenas question e answer.
    Cada answer do JSON deve ter no máximo 150 caracteres.
    A resposta deve ser APENAS um array JSON, sem nenhum texto extra.
    As perguntas devem ser diretamente relacionadas ao conteúdo fornecido.

    Formato exato:
    [
        {{ "question": "...", "answer": "..." }},
        {{ "question": "...", "answer": "..." }}
    ]
    """,
    model_settings={
        "max_tokens": 500
    }
)


def flashcard_ai(prompt: str, url: str) -> dict:
    final_prompt = prompt + url
    result_str = FLASHCARD_AGENT.run_sync(final_prompt)
    result = json.loads(str(result_str.output))

    #if result["status_code"] == 413:
        #return "Token limit ranched"

    return result
