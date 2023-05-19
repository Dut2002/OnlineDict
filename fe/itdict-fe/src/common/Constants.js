export const env = {
    path: 'http://localhost:8080' //localhost
}

export const registerData =
    [
        'username', 'password', 'email', 'phone', 'dob', 'jobId', 'rePassword', 'fullname', 'isConfirmed'
    ]

export const newDicts =
    [
        'name', 'password', 'description', 'publish', 'viewBy', 'editBy', 'categoryList', 'createdBy'
    ]

export const createDicts =
    [
        'name', 'password', 'description', 'viewBy', 'editBy', 'categoryList', 'createdBy'
    ]
export const views =
    [
        { value: 1, name: 'Everyone' },
        { value: 2, name: 'Everyone who has password' },
        { value: 3, name: 'Only me' }
    ]
export const edits =
    [
        { value: 1, name: 'Everyone' },
        { value: 2, name: 'Everyone who has password' },
        { value: 3, name: 'Only me' }
    ]
export const contributes =
    [
        'keyword', 'newDefinition', 'newSyntax', 'newSubTitle', 'categoryList', 'createdBy', 'isConfirmed'
    ]

export const words =
    [
        'keyword', 'defination', 'syntax', 'subTitle', 'categoryList', 'cateIds', 'comment', 'isConfirmed'
    ]
export const screenPermission = ['name', 'value', 'key', 'user', 'approver', 'administrator', 'systemAdmin'];