export const ALLOWED_CONTROL_TYPES = ['inline', 'block', 'alignment', 'menu', 'link', 'customBlock'];
export const ALLOWED_BLOCK_TYPES = [
  'BOLD',
  'ITALIC',
  'UNDERLINE',
  'unordered-list-item',
  'ordered-list-item',
  'unstyled',
  'blockquote',
  'header-one',
  'header-two',
  'header-three',
  'header-four',
  'header-five',
  'header-six',
  'left',
  'center',
  'right',
  'add',
  'remove',
  'hr'
];

export const defaultButtonsConfig = {
  buttonsList: ['B', 'I', 'U', 'UL', 'OL', 'TEXT', 'ALIGNMENT', 'LINK', 'HR'],
  buttonsConf: {
    B: {
      blockType: 'BOLD',
      controlType: 'inline',
      label: 'B',
    },
    I: {
      blockType: 'ITALIC',
      controlType: 'inline',
      label: 'I',
    },
    U: {
      blockType: 'UNDERLINE',
      controlType: 'inline',
      label: 'U',
    },
    UL: {
      blockType: 'unordered-list-item',
      controlType: 'block',
      label: 'UL'
    },
    OL: {
      blockType: 'ordered-list-item',
      controlType: 'block',
      label: 'OL'
    },
    TEXT: {
      controlType: 'menu',
      label: 'Text menu',
      buttons: {
        NT: {
          controlType: 'block',
          label: 'Normal Text',
          blockType: 'unstyled'
        },
        Q: {
          controlType: 'block',
          label: 'Quote',
          blockType: 'blockquote'
        },
        H1: {
          controlType: 'block',
          label: 'Header 1',
          blockType: 'header-one'
        },
        H2: {
          controlType: 'block',
          label: 'Header 2',
          blockType: 'header-two'
        },
        H3: {
          controlType: 'block',
          label: 'Header 3',
          blockType: 'header-three'
        },
        H4: {
          controlType: 'block',
          label: 'Header 4',
          blockType: 'header-four'
        },
        H5: {
          controlType: 'block',
          label: 'Header 5',
          blockType: 'header-five'
        },
        H6: {
          controlType: 'block',
          label: 'Header 6',
          blockType: 'header-six'
        }
      }
    },
    ALIGNMENT: {
      controlType: 'menu',
      label: 'alignment',
      buttons: {
        AL: {
          controlType: 'alignment',
          label: 'Align Left',
          blockType: 'left'
        },
        AC: {
          controlType: 'alignment',
          label: 'Align Center',
          blockType: 'center'
        },
        AR: {
          controlType: 'alignment',
          label: 'Align Right',
          blockType: 'right'
        }
      }
    },
    LINK: {
      controlType: 'menu',
      label: 'Link',
      buttons: {
        LINK: {
          controlType: 'link',
          label: 'Add Link',
          blockType: 'add'
        },
        UNLINK: {
          controlType: 'link',
          label: 'Remove Link',
          blockType: 'remove'
        }
      }
    },
    HR: {
      controlType: 'customBlock',
      label: '---',
      blockType: 'hr'
    },
  }
};