let elements = [
 ...document.querySelectorAll(' body *')
]

function createRecordFromElement(element) {
 const text = element.textContent.trim()
 var record = {}
 const bBox = element.getBoundingClientRect()

if(text.length <= 30 && !(bBox.x == 0 && bBox.y == 0)) {
 record['fontSize'] = parseInt(getComputedStyle(element)['fontSize']) }
 record['y'] = bBox.y
 record['x'] = bBox.x
 record['text'] = text
 return record
}
let records = elements.map(createRecordFromElement)

function canBePrice(record) {
 if( record['y'] > 600 ||
  record['fontSize'] == undefined ||
  !record['text'].match(/(^(C|US|CA|USD|CAD|CDN|\$){0,1}\$?(\s){0,1}\$?[\d,]+(\.\d+){1}(\s){0,1}$|\$\s?\d+)/)
)
 return false
 else return true
}

let possiblePriceRecords = records.filter(canBePrice)
let priceRecordsSortedByFontSize = possiblePriceRecords.sort(function(a, b) {
if (a['fontSize'] == b['fontSize']) return a['y'] > b['y']
return a['fontSize'] < b['fontSize']

})
console.log(priceRecordsSortedByFontSize[0].text);
