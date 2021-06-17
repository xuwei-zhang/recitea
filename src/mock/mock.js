import Mock from 'mockjs'

Mock.mock('/api/getprojectlist', {
    "ret":0,
    'data|10':[
        {
            'title': '@ctitle',
            'id|+1': 1
        }
    ]
});

Mock.mock('/api/getitems', {
    "ret":0,
    'data|30':[
        {
            'id|+1':1,
            'text': '@cparagraph',
            'words|5-10': '@cword'
        }
    ]
})