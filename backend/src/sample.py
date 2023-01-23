import sys

# test用サンプル　削除可です
def is_prime(n: int) -> bool:
    if n <= 1:
        return False

    if n == 2:
        return True

    if n % 2 == 0:
        return False

    i = 3

    while i * i <= n:
        if n % i == 0:
            return False

        i += 2

    return True


if __name__ == '__main__':
    args = sys.argv
    n = int(args[1])
    print(is_prime(n))


is_prime(1)



