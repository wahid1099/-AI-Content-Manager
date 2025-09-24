# 🚀 Social Smart AI - AI-Powered Content Manager

<div align="center">

![Social Smart AI](https://img.shields.io/badge/Social%20Smart%20AI-Content%20Manager-blue?style=for-the-badge&logo=react)
![Version](https://img.shields.io/badge/version-1.0.0-green?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-orange?style=for-the-badge)

**Transform your social media strategy with AI-powered content creation and intelligent scheduling**

[🌟 Live Demo](https://ai-contentmanager.netlify.app/) • [📖 Documentation](#documentation) • [🚀 Quick Start](#quick-start) • [🤝 Contributing](#contributing)

</div>

---

## ✨ Features

### 🎯 **AI-Powered Content Creation**

- **Smart Content Generation**: Create engaging posts with AI assistance
- **Brand Voice Matching**: AI learns and adapts to your unique writing style
- **Multi-Platform Optimization**: Content tailored for Twitter, LinkedIn, Instagram, and Facebook
- **Template Library**: 50+ professionally crafted templates for various industries

### 📊 **Advanced Analytics & Insights**

- **Real-time Performance Tracking**: Monitor engagement, reach, and growth metrics
- **AI-Powered Insights**: Get personalized recommendations to boost performance
- **Optimal Timing Analysis**: Discover the best times to post for maximum engagement
- **Cross-Platform Analytics**: Unified dashboard for all your social accounts

### 📅 **Smart Scheduling & Calendar**

- **Visual Content Calendar**: Plan and organize your content strategy
- **Bulk Scheduling**: Schedule multiple posts across platforms simultaneously
- **Auto-Posting**: Seamless integration with social media APIs
- **Content Queue Management**: Organize and prioritize your content pipeline

### 🎨 **Modern User Experience**

- **Responsive Design**: Perfect experience on desktop, tablet, and mobile
- **Dark/Light Mode**: Customizable themes for comfortable usage
- **Glass Morphism UI**: Modern, elegant interface with smooth animations
- **Accessibility First**: WCAG compliant design for all users

### 👥 **Team Collaboration**

- **Multi-User Support**: Collaborate with team members and clients
- **Role-Based Permissions**: Control access levels for different team members
- **Activity Tracking**: Monitor team actions and content approval workflows
- **Brand Guidelines**: Maintain consistency across all team-generated content

---

## 🛠️ Tech Stack

### **Frontend**

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development with enhanced IDE support
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid styling

### **UI Components**

- **shadcn/ui** - High-quality, accessible React components
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful, customizable icons
- **Recharts** - Composable charting library for analytics

### **State Management & Routing**

- **React Router DOM** - Declarative routing for React applications
- **TanStack Query** - Powerful data synchronization for React
- **React Hook Form** - Performant forms with easy validation

### **Styling & Animation**

- **Tailwind CSS** - Utility-first CSS framework
- **CSS Custom Properties** - Dynamic theming system
- **Framer Motion** - Production-ready motion library (planned)
- **Tailwind Animate** - Animation utilities

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/social-smart-ai.git
   cd social-smart-ai
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

### Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run build:dev    # Build for development environment
npm run preview      # Preview production build locally
npm run lint         # Run ESLint for code quality checks
```

---

## 📁 Project Structure

```
social-smart-ai/
├── 📁 public/                 # Static assets
├── 📁 src/
│   ├── 📁 components/         # Reusable UI components
│   │   ├── 📁 ui/            # shadcn/ui components
│   │   ├── AppLayout.tsx     # Main application layout
│   │   ├── AppSidebar.tsx    # Navigation sidebar
│   │   └── ThemeToggle.tsx   # Theme switching component
│   ├── 📁 pages/             # Application pages/routes
│   │   ├── Dashboard.tsx     # Main dashboard
│   │   ├── CreatePost.tsx    # Content creation interface
│   │   ├── Analytics.tsx     # Analytics dashboard
│   │   ├── Calendar.tsx      # Content calendar
│   │   ├── Templates.tsx     # Template library
│   │   ├── Profile.tsx       # User profile settings
│   │   ├── Settings.tsx      # Application settings
│   │   ├── Landing.tsx       # Landing page
│   │   └── Login.tsx         # Authentication
│   ├── 📁 lib/               # Utility functions and configurations
│   ├── 📁 hooks/             # Custom React hooks
│   ├── 📁 types/             # TypeScript type definitions
│   ├── App.tsx               # Main application component
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles and CSS variables
├── 📄 package.json           # Project dependencies and scripts
├── 📄 tailwind.config.js     # Tailwind CSS configuration
├── 📄 tsconfig.json          # TypeScript configuration
├── 📄 vite.config.ts         # Vite build configuration
└── 📄 README.md              # Project documentation
```

---

## 🎨 Design System

### **Color Palette**

- **Primary**: Blue gradient (#3B82F6 → #8B5CF6)
- **Success**: Green (#10B981)
- **Warning**: Amber (#F59E0B)
- **Error**: Red (#EF4444)
- **Neutral**: Slate scale for text and backgrounds

### **Typography**

- **Font Family**: Inter (system fallback)
- **Responsive Scale**: Fluid typography using clamp()
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### **Spacing & Layout**

- **Grid System**: CSS Grid and Flexbox
- **Responsive Breakpoints**: Mobile-first approach
- **Container Sizes**: Fluid with max-width constraints

---

## 🔧 Configuration

### **Environment Variables**

Create a `.env.local` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=https://api.socialsmartai.com
VITE_APP_VERSION=1.0.0

# Social Media API Keys (for production)
VITE_TWITTER_API_KEY=your_twitter_api_key
VITE_LINKEDIN_API_KEY=your_linkedin_api_key
VITE_INSTAGRAM_API_KEY=your_instagram_api_key

# Analytics
VITE_GOOGLE_ANALYTICS_ID=your_ga_id
```

### **Customization**

- **Themes**: Modify CSS custom properties in `src/index.css`
- **Components**: Extend shadcn/ui components in `src/components/ui/`
- **Layouts**: Customize application layout in `src/components/AppLayout.tsx`

---

## 📱 Features Overview

### **Dashboard**

- Real-time analytics overview
- Quick action buttons for content creation
- Recent activity feed
- Performance highlights and insights

### **Content Creation**

- AI-powered content generation
- Multi-platform preview
- Hashtag suggestions
- Media upload and management
- Brand voice customization

### **Analytics**

- Engagement rate tracking
- Follower growth analysis
- Best posting times
- Content performance comparison
- Export capabilities

### **Calendar**

- Visual content planning
- Drag-and-drop scheduling
- Bulk operations
- Team collaboration features

### **Templates**

- Industry-specific templates
- Customizable content blocks
- Performance-based recommendations
- Template sharing and collaboration

---

## 🚀 Deployment

### **Lovable Platform** (Recommended)

1. Visit [Lovable Project](https://lovable.dev/projects/db9c4350-592b-442c-9066-aed23d9a3d18)
2. Click **Share → Publish**
3. Configure custom domain if needed

### **Manual Deployment**

```bash
# Build for production
npm run build

# Deploy to your preferred hosting platform
# (Vercel, Netlify, AWS S3, etc.)
```

### **Custom Domain**

To connect a custom domain:

1. Navigate to **Project > Settings > Domains**
2. Click **Connect Domain**
3. Follow the DNS configuration instructions

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### **Getting Started**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### **Development Guidelines**

- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

### **Code Style**

- Use functional components with hooks
- Implement proper TypeScript typing
- Follow the established folder structure
- Use Tailwind CSS for styling
- Ensure accessibility compliance

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Radix UI** for accessible primitives
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the icon library
- **Lovable** for the development platform

---

## 📞 Support

- **Documentation**: [Project Wiki](https://github.com/your-username/social-smart-ai/wiki)
- **Issues**: [GitHub Issues](https://github.com/your-username/social-smart-ai/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/social-smart-ai/discussions)
- **Email**: support@socialsmartai.com

---

<div align="center">

**Made with ❤️ by the Social Smart AI Team**

[⭐ Star this repo](https://github.com/your-username/social-smart-ai) • [🐛 Report Bug](https://github.com/your-username/social-smart-ai/issues) • [💡 Request Feature](https://github.com/your-username/social-smart-ai/issues)

</div>
