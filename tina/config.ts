// Tina CMS configuration
import { defineConfig } from 'tinacms';

export default defineConfig({
  clientId: process.env.TINA_PUBLIC_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  branch: process.env.GITHUB_BRANCH ?? 'main',
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'images/uploads',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'blog',
        label: 'Blog Posts',
        path: 'src/content/blog',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            required: true,
          },
          {
            type: 'datetime',
            name: 'pubDate',
            label: 'Publish Date',
            required: true,
          },
          {
            type: 'datetime',
            name: 'updatedDate',
            label: 'Updated Date',
          },
          {
            type: 'image',
            name: 'heroImage',
            label: 'Hero Image',
          },
          {
            type: 'string',
            name: 'tags',
            label: 'Tags',
            list: true,
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
        ],
      },
      {
        name: 'events',
        label: 'Events',
        path: 'src/content/events',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            required: true,
          },
          {
            type: 'datetime',
            name: 'date',
            label: 'Date',
            required: true,
          },
          {
            type: 'datetime',
            name: 'endDate',
            label: 'End Date',
          },
          {
            type: 'string',
            name: 'location',
            label: 'Location',
          },
          {
            type: 'string',
            name: 'url',
            label: 'URL',
          },
          {
            type: 'string',
            name: 'photos',
            label: 'Photos',
            list: true,
          },
          {
            type: 'object',
            name: 'attachments',
            label: 'Attachments',
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.label || 'Attachment',
              }),
            },
            fields: [
              {
                type: 'image',
                name: 'url',
                label: 'File',
                required: true,
              },
              {
                type: 'string',
                name: 'label',
                label: 'Label',
                required: true,
              },
            ],
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
        ],
      },
    ],
  },
});
