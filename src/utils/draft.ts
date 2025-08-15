import { getCollection, type CollectionEntry } from 'astro:content'

/**
 * Get all posts, filtering out posts whose filenames start with _
 */
export async function getFilteredPosts(locale: 'id' | 'en' = 'id') {
  try {
    const posts = locale === 'id' ?  await getCollection('posts') : await getCollection('enPosts')
    return posts.filter((post: CollectionEntry<'posts' | 'enPosts'>) => !post.id.startsWith('_'))

  } catch (error) {
    console.error(error)
    return []
  }
}

/**
 * Get all posts sorted by publication date, filtering out posts whose filenames start with _
 */
export async function getSortedFilteredPosts(locale: 'id' | 'en' = 'id') {
  const posts = await getFilteredPosts(locale)
  return posts.sort(
    (a: CollectionEntry<'posts' | 'enPosts'>, b: CollectionEntry<'posts' | 'enPosts'>) =>
      b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  )
}
