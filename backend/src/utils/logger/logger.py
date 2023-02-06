import logging


def setup_logger(name):
    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG)

    # ファイルに出力するログレベルをWARNINGに設定。挙動みて変更可
    fh = logging.FileHandler("./src/utils/logger/test.log")
    fh.setLevel(logging.WARNING)
    fh_formatter = logging.Formatter("%(levelname)s %(asctime)s [%(name)s] %(message)s")
    fh.setFormatter(fh_formatter)

    # コンソールに出力するログレベルをdebugに設定 挙動みて変更可
    ch = logging.StreamHandler()
    ch.setLevel(logging.DEBUG)
    ch_formatter = logging.Formatter(
        "%(asctime)s - %(levelname)s - %(message)s", "%Y-%m-%d %H:%M:%S"
    )
    ch.setFormatter(ch_formatter)

    logger.addHandler(fh)
    logger.addHandler(ch)
    return logger
