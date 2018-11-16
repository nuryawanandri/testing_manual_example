let isTesting = false

class DocumentWithProxyClass {
  constructor() {
    this.data = {};
  }

  addIdValue(id, value) {
    this.data[id] = value;
  }

  removeIdValue(id) {
    delete this.data[id];
  }

  getElementById(id) {
    if (isTesting) {
      return { 
        value: this.data[id] 
      };
    } else {
      return document.getElementById(id);
    }
  }
}

let documentWithProxy = new DocumentWithProxyClass();

function testEverything () {
  isTesting = true

  const cases = [
    {
      title: "Case 1 filter by body with value laudantium : ",
      data: {
        dataJson: [
          {
            "postId": 1,
            "id": 1,
            "name": "id labore ex et quam laborum",
            "email": "Eliseo@gardner.biz",
            "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
          },
          {
            "postId": 1,
            "id": 2,
            "name": "quo vero reiciendis velit similique earum",
            "email": "Jayne_Kuhic@sydney.com",
            "body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
          },
          {
            "postId": 1,
            "id": 3,
            "name": "odio adipisci rerum aut animi",
            "email": "Nikita@garfield.biz",
            "body": "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione"
          },
        ],
        keySearchValue: 'laudantium',
        keySearchId: 'search-key',
        dataSearch: [
          {
            "postId": 1,
            "id": 1,
            "name": "id labore ex et quam laborum",
            "email": "Eliseo@gardner.biz",
            "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
          },
          {
            "postId": 1,
            "id": 3,
            "name": "odio adipisci rerum aut animi",
            "email": "Nikita@garfield.biz",
            "body": "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione"
          },
        ]
      },
      before_test: (caseData) => {
        documentWithProxy.addIdValue(caseData.keySearchId, caseData.keySearchValue)
      },
      testFunction: (caseData) => {
        let actualDataSearch = searchData(caseData.dataJson)
        let expectedDataSearch = caseData.dataSearch
        assert(actualDataSearch, expectedDataSearch)
      },
      after_test: (caseData) => {
        documentWithProxy.removeIdValue(caseData.keySearchId)
      }
    },
    {
      title: "Case 2 sorted Ascending by Name --- ",
      data: {
        dataJson: [
          {
            "postId": 1,
            "id": 1,
            "name": "id labore ex et quam laborum",
            "email": "Eliseo@gardner.biz",
            "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
          },
          {
            "postId": 1,
            "id": 2,
            "name": "quo vero reiciendis velit similique earum",
            "email": "Jayne_Kuhic@sydney.com",
            "body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
          },
          {
            "postId": 1,
            "id": 3,
            "name": "odio adipisci rerum aut animi",
            "email": "Nikita@garfield.biz",
            "body": "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione"
          },
        ],
        sortBy: 'name',
        sortOrder: 'ascending',
        originalSortOrder: sortOrder,
        originalShowdata: showData,
        dataSorted: [
          {
            "postId": 1,
            "id": 1,
            "name": "id labore ex et quam laborum",
            "email": "Eliseo@gardner.biz",
            "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
          },
          {
            "postId": 1,
            "id": 3,
            "name": "odio adipisci rerum aut animi",
            "email": "Nikita@garfield.biz",
            "body": "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione"
          },
          {
            "postId": 1,
            "id": 2,
            "name": "quo vero reiciendis velit similique earum",
            "email": "Jayne_Kuhic@sydney.com",
            "body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
          },
        ],
      },
      before_test: (caseData) => {
        documentWithProxy.addIdValue('search-key', '')
        sortOrder = caseData.sortOrder
        showData = (data) => data
      },
      testFunction: (caseData) => {
        let actualDataSorted = sortingData(caseData.dataJson, caseData.sortBy)
        let expectedDataSorted = caseData.dataSorted
        assert(actualDataSorted, expectedDataSorted)
      },
      after_test: (caseData) => {
        sortOrder = caseData.originalSortOrder
        documentWithProxy.removeIdValue(caseData.keySearchId)
        showData = caseData.originalShowdata
      }
    }
  ]

  cases.forEach(( itemCase ) => {
    console.log(`------- ${itemCase.title} ------`)
    console.log('Before Test---')
    itemCase.before_test(itemCase.data)
    console.log('Running Test Function ---')
    itemCase.testFunction(itemCase.data);
    console.log('After Test ---')
    itemCase.after_test(itemCase.data)
    console.log('Test Finish ----')
  })

  isTesting = false
}

function assert(actual, expected) {
  if (_.isEqual(expected, actual)) {
    console.log('ASSERT: ----> OK --- ')
  } else {
    console.log('ASSERT: ----> NOT OK --- ')
    console.log('Expected : ', expected)
    console.log('Actual : ', actual)
  }
}