export const Nodes = [
  {
    id: 0,
    name: 'Leaf 1',
    state: {
      expanded: true,
    },
    children: [
      {
        id: 2,
        name: 'Leaf 2',
        state: {
          expanded: true,
          deletable: true,
        },
        children: [
          {
            id: 3,
            name: 'Leaf 3',
            state: {
              expanded: false,
              favorite: true,
              deletable: true,
            },
            children: [
              {
                id: 'c-3',
                name: 'Leaf 3 Child',
                state: {},
              },
            ],
          },
          {
            id: 4,
            name: 'Leaf 4',
          },
        ],
      },
      {
        id: 5,
        name: 'Leaf 5',
      },
    ],
  },
  {
    id: 1,
    name: 'Leaf 6',
    state: {
      expanded: false,
      deletable: true,
    },
    children: [
      {
        id: 6,
        name: 'Leaf 7',
        state: {
          expanded: false,
        },
        children: [
          {
            id: 7,
            name: 'Leaf 8',
          },
          {
            id: 8,
            name: 'Leaf 9',
          },
        ],
      },
      {
        id: 9,
        name: 'Leaf 10',
      },
    ],
  },
  {
    id: 'z',
    name: 'Leaf z',
    state: {
      deletable: true,
      favorite: true,
    },
  },
];
