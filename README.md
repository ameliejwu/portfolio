# AMELIE WU'S PORTFOLIO

This is the source-code for Amelie's portfolio. Built using Eleventy and deployed via GitHub Pages.

## Local development
### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Local

1. **Clone the repository**
   ```sh
   git clone https://github.com/adal-o/AWU_WEB2.git
   cd AWU_WEB2
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Run the local server**
   ```sh
   npm run serve
   # Visit http://localhost:8080/ (you may need to modify baseUrl in `_data/site.json` and `_data/images.js`)
   ```

4. **Build for production**
   ```sh
   npm run build
   # Output is in the ./docs directory for GitHub Pages
   ```

## Gallery Images

Galleries will automatically populate images from their respective image folder. They will be populated in order, so if you'd like to change the order, rename the images.

## Website Customization

### Creating A New Gallery

- Duplicate one of the photo galleries of your choice and rename it.
- Create a new folder in `static/images/`
- Modify `_data/images.json` to export its respective gallery