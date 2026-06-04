import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useAppStore } from '@/store/useAppStore';
import { PostItem } from '@/types';

const initialEditor: Omit<PostItem, 'id' | 'updatedAt'> = {
  title: '',
  author: '',
  status: 'draft',
  content: ''
};

export function ContentPage() {
  const posts = useAppStore((state) => state.posts);
  const addPost = useAppStore((state) => state.addPost);
  const updatePost = useAppStore((state) => state.updatePost);
  const deletePost = useAppStore((state) => state.deletePost);

  const [editor, setEditor] = useState(initialEditor);
  const [selectedId, setSelectedId] = useState<string>('');

  const selectedPost = useMemo(() => posts.find((post) => post.id === selectedId), [posts, selectedId]);

  const handleSave = () => {
    if (!editor.title.trim()) return;

    if (selectedPost) {
      updatePost(selectedPost.id, editor);
    } else {
      addPost(editor);
    }

    setEditor(initialEditor);
    setSelectedId('');
  };

  const beginEdit = (post: PostItem) => {
    setSelectedId(post.id);
    setEditor({ title: post.title, author: post.author, status: post.status, content: post.content });
  };

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Content Management"
        description="Operate editorial workflow with draft and publishing states."
        metrics={`${posts.length} managed posts`}
      />
      <div className="grid gap-4 lg:grid-cols-2">
      <Card title="Post Library" subtitle="Create, edit, delete and publish">
        <div className="space-y-2">
          {posts.map((post) => (
            <article key={post.id} className="rounded-xl border p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold">{post.title}</h4>
                  <p className="text-xs text-muted">
                    {post.author} · {post.updatedAt} · {post.status}
                  </p>
                </div>
                <div className="space-x-2">
                  <button className="rounded-md border px-2 py-1 text-xs" onClick={() => beginEdit(post)}>
                    Edit
                  </button>
                  <button className="rounded-md border px-2 py-1 text-xs" onClick={() => deletePost(post.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        {posts.length === 0 && <EmptyState title="No posts yet" description="Create your first draft from the editor." />}
      </Card>

      <Card title="Rich Text Editor (UI)" subtitle={selectedPost ? `Editing ${selectedPost.title}` : 'Create new post'}>
        <div className="space-y-3">
          <input
            className="w-full rounded-xl border px-3 py-2 text-sm"
            value={editor.title}
            onChange={(event) => setEditor((prev) => ({ ...prev, title: event.target.value }))}
            placeholder="Post title"
          />
          <input
            className="w-full rounded-xl border px-3 py-2 text-sm"
            value={editor.author}
            onChange={(event) => setEditor((prev) => ({ ...prev, author: event.target.value }))}
            placeholder="Author"
          />
          <select
            className="w-full rounded-xl border px-3 py-2 text-sm"
            value={editor.status}
            onChange={(event) => setEditor((prev) => ({ ...prev, status: event.target.value as 'draft' | 'published' }))}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <textarea
            className="min-h-52 w-full rounded-xl border px-3 py-2 text-sm"
            value={editor.content}
            onChange={(event) => setEditor((prev) => ({ ...prev, content: event.target.value }))}
            placeholder="Write your content here..."
          />
          <div className="flex gap-2">
            <Button onClick={handleSave}>{selectedPost ? 'Update Post' : 'Create Post'}</Button>
            <Button variant="secondary" onClick={() => {
              setSelectedId('');
              setEditor(initialEditor);
            }}>
              Reset
            </Button>
          </div>
        </div>
      </Card>
      </div>
    </div>
  );
}
