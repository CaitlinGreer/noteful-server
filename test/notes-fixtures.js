function makeNotesArray() {
    return [
        {
            id: 1,
            note_name: 'Note Number 1',
            note_content: 'Content for note number 1',
            modified: '2021-01-22T16:28:32.615Z',
            folder_id: 1
        },
        {
            id: 2,
            note_name: 'Note Number 2',
            note_content: 'Content for note number 2',
            modified: '2021-01-22T6:28:32.615Z',
            folder_id: 2
        },
        {
            id: 3,
            note_name: 'Note Number 3',
            note_content: 'Content for note number 3',
            modified: '2021-01-22T16:28:32.615Z',
            folder_id: 3
        },
    ]
}

module.exports = {
     makeNotesArray
}