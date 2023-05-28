def validate_pin_code(pin_code):
    pin_code = list(int(x) for x in pin_code)

    if len(pin_code) < 6:
        return False

    if count_triple_number(pin_code) >= 1:
        return False

    if is_trend_up(pin_code) or is_trend_down(pin_code):
        return False

    if count_dual_number(pin_code) > 2:
        return False

    return True


def count_dual_number(pin_code):
    cnt = 0
    for i in range(len(pin_code)-1):
        if pin_code[i] == pin_code[i+1]:
            cnt += 1
    return cnt


def count_triple_number(pin_code):
    cnt = 0
    for i in range(len(pin_code)-2):
        if pin_code[i] == pin_code[i+1] and pin_code[i+1] == pin_code[i+2]:
            cnt += 1
    return cnt


def is_trend_up(pin_code):
    cnt = 0
    for i in range(len(pin_code)-1):
        if pin_code[i] == pin_code[i+1] - 1:
            cnt += 1
            if cnt >= 2:
                return True
        else:
            cnt = 0
    return False


def is_trend_down(pin_code):
    cnt = 0
    for i in range(len(pin_code)-1):
        if pin_code[i] == pin_code[i+1] + 1:
            cnt += 1
            if cnt >= 2:
                return True
        else:
            cnt = 0
    return False


if __name__ == '__main__':
    print(validate_pin_code("17283"))   # EXPECT FALSE
    print(validate_pin_code("172839"))  # EXPECT TRUE
    print(validate_pin_code("118822"))  # EXPECT FALSE
    print(validate_pin_code("111762"))  # EXPECT FALSE
    print(validate_pin_code("123743"))  # EXPECT FALSE
    print(validate_pin_code("321895"))  # EXPECT FALSE
    print(validate_pin_code("124578"))  # EXPECT TRUE
    print(validate_pin_code("112233"))  # EXPECT FALSE
    print(validate_pin_code("882211"))  # EXPECT FALSE
    print(validate_pin_code("887712"))  # EXPECT TRUE
