from os.path import dirname

with open(dirname(__file__) + "./input_1.txt", "r") as f:
    test_cases = [line.strip() for line in f.readlines()]


words_to_num = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
]


def f(test_case):

    low_numeric,high_numeric = None,None
    for i,x in enumerate(test_case):
        if x.isnumeric():
            if low_numeric is None:
                low_numeric = (x,i)
            high_numeric = (x,i)
    
    
    indices = list((test_case.index(w),test_case.rindex(w),str(i)) for i,w in enumerate(words_to_num) if w in test_case)

    if len(indices) != 0:

        low_word,high_word = min(indices),max(indices,key=lambda x : x[1])
        if low_numeric is not None and low_numeric[1] < low_word[0]:
            low = low_numeric[0]
        else:
            low = low_word[2]

        if high_numeric is not None and high_numeric[1] > high_word[1]:
            high = high_numeric[0]
        else:
            high = high_word[2]

        test_case = low + high

    else:
        test_case = low_numeric[0] + high_numeric[0]

    return int(test_case)



print(sum(map(f,test_cases)))

