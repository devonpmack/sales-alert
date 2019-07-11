import requests
from pandas import read_csv
from bs4 import BeautifulSoup
import smtplib

#Username and password for gmail account, webrowser headers.
headers = {"User-Agent": 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'}
username = 'amazonalertsystem@gmail.com'
password = 'FieldMath100'


def check_price():
    items = csvToURL()
    for item in items:
        recipient = item[0]
        url = item[1]
        willingPay = float(item[2])

        page = requests.get(url, headers=headers)
        soup = BeautifulSoup(page.content, 'html.parser')
        title = soup.find(id="productTitle").get_text() #TODO somehow include title in the email...

        if soup.find(id="priceblock_dealprice") is None:
            price = soup.find(id="priceblock_ourprice").get_text()
        else:
            price = soup.find(id="priceblock_dealprice").get_text()

        converted_price = float(price[5:])  #removes the first 5 char, amazon specific!

        if(converted_price <= willingPay):
            sendMail(recipient, url)
            print('sending email to:', recipient)
            items.remove(item) #TODO find a way to delete the row after it passes the criteria...


def sendMail(recipient, body):
    subject = 'Amazon Price Drop'
    msg = f"Subject: {subject}\n\n{body}"

    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.ehlo()
    server.starttls()
    server.ehlo()

    server.login(username, password)
    server.sendmail(
        'amazonalertsystem@gmail.com',
        recipient,
        msg
    )
    print('Email has been sent')

    server.quit()


def csvToURL():
    data = read_csv("amazon_products.csv")
    return data.values.tolist()


if __name__ == "__main__":
    check_price()
