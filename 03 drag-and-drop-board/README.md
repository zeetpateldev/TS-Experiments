# Drag and Drop Board

A fully functional drag-and-drop task board with smooth animations and intuitive interactions.

## Features

### ✨ Enhanced Drag-and-Drop Functionality

- **Reorder within lists**: Drag cards up and down within the same column (e.g., move "Define board data model" from bottom to top in Todo)
- **Move between lists**: Drag cards across different columns (e.g., move "Define board data model" from Todo to In Progress)
- **Smart positioning**: Drop cards at any position - top, middle, or bottom of any list
- **Visual feedback**: Clear visual indicators when dragging and hovering over drop zones

### 🎨 Design Features

- Beautiful gradient background matching the reference design
- Smooth animations and transitions
- Responsive layout that adapts to different screen sizes
- Color-coded columns with custom accent colors:
  - **Todo**: Orange accent
  - **In Progress**: Purple/Blue accent
  - **Complete**: Green accent
- Polished spacing and typography
- Hover effects and drag states

## How to Use

1. **Hover** over any card to see the interactive hover effect
2. **Click and hold** to start dragging a card
3. **Move** the card to any position:
   - Within the same list to reorder tasks
   - To a different list to change task status
4. **Release** to drop the card in the new position

## Technical Implementation

### JavaScript Features
- Event-driven drag-and-drop using HTML5 Drag and Drop API
- Dynamic element positioning based on mouse coordinates
- Proper event handling for dragstart, dragover, dragenter, dragleave, and drop events
- Smart drop zone detection using `getBoundingClientRect()`

### CSS Features
- CSS custom properties (CSS variables) for easy theming
- Flexbox and Grid layouts for responsive design
- Smooth transitions and transforms
- Box shadows and gradients for depth
- Mobile-responsive with media queries

## Browser Support

Works on all modern browsers that support HTML5 Drag and Drop API:
- Chrome/Edge 4+
- Firefox 3.5+
- Safari 3.1+
- Opera 12+

## Files Structure

```
03 drag-and-drop-board/
├── index.html     # HTML structure with semantic markup
├── style.css      # Styling with modern CSS features
├── script.js      # Drag-and-drop logic
└── README.md      # Documentation
```

## Future Enhancements

- Add local storage persistence
- Implement add/delete card functionality
- Add card editing capabilities
- Include task details and due dates
- Add keyboard navigation support
- Implement undo/redo functionality