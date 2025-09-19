# Changes:

- Add tailwindcss to the project and migrate all the css to utilize the tailwindcss classes.
- Move the Dark and light mode switching button to the navigation bar.
- The navigation bar is white in the dark mode, it should be a shade of black in the dark mode and white in the light mode
- In the Dark mode the fonts are displayed as shade of black but it should be displayed as shade of white.

- Center the footer to the bottom center of the page.
```jsx Layout.js
<footer className="site-footer">
    <div className="container">
        <p>© {new Date().getFullYear()} Energy Saver. Save smart, live better.</p>
    </div>
</footer>
```