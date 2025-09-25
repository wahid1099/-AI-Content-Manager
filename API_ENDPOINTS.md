# API Endpoints Documentation

## Available Backend Endpoints

### Social Posts Management

#### 1. Generate Post

- **Endpoint**: `POST /api/v1/social-posts/generate`
- **Description**: Generate AI-powered content for multiple platforms
- **Request Body**:

```json
{
  "prompt": "Write a LinkedIn post about AI productivity tools",
  "platforms": ["LinkedIn", "Twitter", "Facebook"],
  "tone": "Professional",
  "hashtags": ["#AI", "#Productivity", "#Tech"]
}
```

#### 2. Get User Posts

- **Endpoint**: `GET /api/v1/social-posts/my-posts`
- **Description**: Retrieve all posts created by the authenticated user

#### 3. Update Post

- **Endpoint**: `PATCH /api/v1/social-posts/:postId`
- **Description**: Update/edit existing posts
- **Request Body**:

```json
{
  "prompt": "Updated prompt",
  "platforms": ["LinkedIn", "Twitter"],
  "tone": "Casual",
  "hashtags": ["#Updated"],
  "generatedContent": {
    "posts": {
      "LinkedIn": "Updated LinkedIn content",
      "Twitter": "Updated Twitter content"
    },
    "hasImage": true
  },
  "imageUrl": "https://example.com/image.jpg",
  "scheduledDate": "2025-01-01T12:00:00Z"
}
```

#### 4. Delete Post

- **Endpoint**: `DELETE /api/v1/social-posts/:postId`
- **Description**: Delete a specific post

#### 5. Get Scheduled Posts

- **Endpoint**: `GET /api/v1/social-posts/scheduled`
- **Description**: Retrieve all scheduled posts

#### 6. Get Posts by Platform

- **Endpoint**: `GET /api/v1/social-posts/platform/:platform`
- **Description**: Get posts filtered by specific platform (e.g., LinkedIn, Twitter)

#### 7. Publish Post

- **Endpoint**: `PATCH /api/v1/social-posts/:postId/publish`
- **Description**: Publish a scheduled post immediately

## Image Upload Integration

### ImageBB Configuration

The application uses ImageBB for image hosting. To configure:

1. Get a free API key from [ImageBB](https://api.imgbb.com/)
2. Copy `.env.example` to `.env`
3. Add your API key: `VITE_IMAGEBB_API_KEY=your_api_key_here`

### Image Upload Features

- **File Validation**: Only image files, max 5MB
- **Automatic Upload**: Images uploaded to ImageBB when selected
- **URL Storage**: Image URLs stored in post data, not uploaded to backend
- **Preview**: Real-time image preview with delete option

## Frontend Features

### Post Management

- ✅ **Create**: Generate AI content for multiple platforms
- ✅ **Read**: View all generated posts with platform-specific content
- ✅ **Update**: Edit existing posts with full content modification
- ✅ **Delete**: Remove posts with confirmation dialog
- ✅ **Publish**: Publish draft posts immediately

### Content Features

- **Platform-Specific Content**: Each platform gets tailored content
- **Image Upload**: Drag-and-drop image upload with preview
- **Copy to Clipboard**: One-click copy for each platform's content
- **Character Limits**: Real-time character count with platform limits
- **Live Preview**: See how posts will appear on each platform

### UI/UX Enhancements

- **Edit Mode**: Clear indication when editing existing posts
- **Form Reset**: "New Post" button to start fresh
- **Status Indicators**: Visual status for draft/published posts
- **Responsive Design**: Works on all device sizes
- **Toast Notifications**: User feedback for all actions

## Usage Examples

### Creating a New Post

1. Enter a content prompt
2. Select target platforms
3. Choose tone and hashtags
4. Optionally upload an image
5. Click "Generate with AI"
6. Review platform-specific content
7. Schedule or publish

### Editing an Existing Post

1. Go to "My Posts" tab
2. Click "Edit" on any post
3. Modify content, platforms, or settings
4. Upload/change images if needed
5. Click "Update Post"

### Managing Posts

- **Copy Content**: Click "📋 Copy" for any platform
- **Delete Posts**: Click the X button with confirmation
- **Publish Drafts**: Click "Publish" for draft posts
- **View History**: All posts with creation dates and status
