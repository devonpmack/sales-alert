# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

AVAILABLE_PROXIES = [
  '173.46.67.172:58517',
  '24.172.82.94:53281',
  '35.192.7.115:8080',
  '35.247.189.6:8080',
  '68.251.250.193:8080',
  '76.87.101.188:38875'
]

proxies = ProxyUrl.create!(AVAILABLE_PROXIES.map { |proxy| {ip: proxy} })
