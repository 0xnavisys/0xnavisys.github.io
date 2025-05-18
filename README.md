# 0xnavi :: Digital Presence Node

## Ψ // realtime_signal_decay // terminal_interface_active

Welcome to the source code of the website belonging to **0xnavi**. This project is an experimental, 1990s/2000s-inspired personal website with a heavy influence from **Serial Experiments Lain** alongside more unconventional website design.

---

### Features

*   **Aesthetics**: Dark themes, terminal green text, red/blue accents, glitch effects, and pixel art references.
*   **Experimental UI/UX**: Rotated banners/navbars, dynamic text scrambling, subtle 3D tilts, and atmospheric animations.
*   **Interactive Elements**:
    *   **Mouse-Reactive 3D Container**: The main content area subtly tilts based on mouse position.
    *   **Text Scramble Effect**: Headings "decrypt" or emerge from digital noise on load.
    *   **Dynamic System Log**: A ticker displays fictional system messages and status updates.
    *   **3D Cube! Waow!**: An animated, glowing 3D cube adds to the liminal feel.
    *   **Quasi-Terminal Interface**:
        *   Located via the "[ Direct_Interface ]" navigation link.
        *   Accepts several themed commands (`help`, `whoami`, `connect`, `scan`, `lain`, `matrix`, `clear`, `date`).
        *   Command history (up/down arrows).
        *   Thematic outputs and simulated system interactions.
*   **Retro Web Feel**: Inspired by early internet design philosophies but built with modern HTML, CSS, and vanilla JavaScript.
*   **LibreJS Compliant**: All JavaScript is vanilla and explicitly licensed under GPL-3.0-or-later, ensuring it aligns with free software principles.
*   **Smooth Scrolling**: Navbar links smoothly transition to their respective content sections.

---

### Technologies Used

*   **HTML5**: Semantic structure for the content.
*   **CSS3**: Styling, animations, layout (including Flexbox), 3D transforms, custom properties (variables), and pseudo-elements for advanced effects.
*   **Vanilla JavaScript (ES6+)**: For all interactive features, DOM manipulation, and dynamic effects, adhering to LibreJS standards. No external frameworks or libraries are used for core functionality.
*   **Google Fonts**: `VT323` is used for some display/terminal text to enhance the pixelated, retro aesthetic.

---

### Project Structure

```
/
├── index.html # The main HTML file
├── LICENSE # GPL-3.0 License text
├── README.md # This file
├── js/
│ └── index.js # All JavaScript code
└── styles/
└──── style.css # All CSS styles
```


---

### Setup and Running

1.  Clone this repository or download the files.
2.  Ensure the directory structure listed above is maintained.
3.  Open `index.html` in any modern web browser.
    *   An internet connection is recommended for the `VT323` Google Font to load correctly.
    *   For the best experience, use a browser that supports modern CSS3 features and ES6 JavaScript.

---

### Licensing

This project is licensed under the **GNU General Public License v3.0 or later**.

*   The full license text can be found in the `LICENSE` file.
*   The `index.html` file contains a license comment pointing to `js/index.js`.
*   The `js/index.js` and `styles/style.css` files also contain license headers.

This ensures the software is free, allowing users to run, study, share, and modify it.

---

### Future Ideas

*   More complex terminal commands and interactions (e.g., simple file system simulation, basic text "games").
*   Enhanced visuals for terminal commands.
*   More ASCII art or generative visuals.
*   Sound effects.
*   A "guestbook" or "message board" within the terminal or as a separate section.

---

> "No matter where you go, everyone's connected."

> Let's all love Lain.
