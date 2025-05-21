# Wildlife - Virtual Zoo Experience

A modern, interactive virtual zoo experience built with React, TypeScript, and Vite. This application provides users with an immersive digital platform to explore wildlife, learn about conservation efforts, and engage with zoo activities.

## 🚀 Features

- **Interactive Animal Directory**: Browse and learn about various animals
- **Virtual Zoo Map**: Navigate through different zoo areas
- **Conservation Information**: Stay updated on conservation efforts
- **User Authentication**: Secure login and registration system
- **Visitor Information**: Access important zoo visitor details
- **Shop Integration**: Browse zoo merchandise
- **Dark/Light Theme**: Support for both dark and light modes
- **Responsive Design**: Works seamlessly across all devices

## 🛠️ Tech Stack

- React 
- TypeScript
- Vite
- Material-UI
- React Router
- TailwindCSS
- Context API for state management

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

## 🔧 Installation

1. Clone the repository
```bash
git clone [repository-url]
cd WildLife
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

## 📁 Project Structure

```
src/
├── components/        # Reusable components
│   ├── auth/         # Authentication related components
│   ├── home/         # Homepage components
│   └── layout/       # Layout components
├── contexts/         # React Context providers
├── data/            # Static data and constants
├── pages/           # Page components
└── theme/           # Theme configuration
```

## 🎨 Key Components

- **Layout**: Main application layout with header and footer
- **PageLoadingBar**: Progress indicator for route transitions
- **AuthContext**: Handles user authentication state
- **ThemeContext**: Manages application theme settings

## 🔐 Authentication

The application includes protected routes and authentication flow:
- Login/Register functionality
- Protected route wrapper
- Profile management

## 🎯 Available Pages

- Home
- Animal Directory
- Animal Detail
- Conservation
- Visitor Information
- Zoo Map
- Shop
- Profile
- Login/Register

## 🖥️ Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- All the contributors who participated in this project
- The open source community for providing amazing tools and libraries
