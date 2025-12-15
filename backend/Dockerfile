FROM python:3.12-slim-bookworm

WORKDIR /core

RUN apt-get update && \
    apt-get install -y curl

RUN curl -LsSf https://astral.sh/uv/install.sh | sh

# Essa linha está no site oficial do uv para usar num Dockerfile
ENV PATH="/root/.local/bin/:$PATH"

COPY pyproject.toml uv.lock ./ 

RUN uv sync --no-dev

COPY . .

RUN mkdir -p /core/staticfiles
RUN uv run python3 manage.py migrate
RUN uv run python3 manage.py collectstatic --noinput

EXPOSE 8000

CMD [ "uv", "run", "gunicorn", "core.wsgi:application", "--bind", "0.0.0.0:8000" ]
