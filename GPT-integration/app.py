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
