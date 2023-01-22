FROM python:3.9

WORKDIR /app

RUN pip install poetry
COPY pyproject.toml pyproject.toml ./

RUN poetry config virtualenvs.create false \
    && poetry install --no-root

# RUN poetry config virtualenvs.in-project true
# RUN if [ -f pyproject.toml ]; then poetry install; fi


EXPOSE 8888

CMD ["poetry", "run", "uvicorn", "src.main:app", "--reload", "--host", "0.0.0.0", "--port", "8888"]

