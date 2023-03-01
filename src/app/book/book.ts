export class Book {
  isSelected: boolean;
  id: number;
  title: string;
  author: string;
  isEdit: boolean;
}

export const BookColumns = [
  {
    key: 'isSelected',
    type: 'isSelected',
    label: '',
  },
  {
    key: 'id',
    type: 'number',
    label: 'ID'
  },
  {
    key: 'title',
    type: 'text',
    label: 'Book Title',
  },
  {
    key: 'author',
    type: 'text',
    label: 'Book Author',
    required: true,
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];
