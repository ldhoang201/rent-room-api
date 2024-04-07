import openai

def ask(text) :
    openai.api_key = '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'
    response = openai.Completion.create(model="gpt-3.5-turbo-instruct",
                                          prompt=text,
                                          max_tokens=150)
    return print(response.choices[0].text)
    

def main() : 
    while True:
        myQn = input()
        ask(myQn)

main()
