FROM python:3.9

WORKDIR /app

RUN pip install poetry
COPY pyproject.toml poetry.lock ./

RUN poetry config virtualenvs.create false \
    && poetry install --no-root


EXPOSE 8888

CMD ["poetry", "run", "uvicorn", "src.main:app", "--reload", "--host", "0.0.0.0", "--port", "8888"]

