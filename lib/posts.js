import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import { remark } from 'remark';
import html from 'remark-html';

const postDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostData() {
  const fileNames = fs.readdirSync(postDirectory);

  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
      id,
      ...matterResult.data,
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.data < b.data) {
      return 1;
    } else {
      return -1;
    }
  })
}

export function getAllPostIds() {
  const fileName = fs.readdirSync(postDirectory);

  return fileName.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

// Вот то что мне было нужно?
export async function getAllPostIdsWithAPI() {
  // Получение данных из API, а не из файловой системы.
  const res = await fetch('...');
  const posts = await res.json();

  return posts.map((post) => {
    return {
      params: {
        id: post.id,
      }
    }
  });

}

/* export function getPostData(id) {
  const fullPath = path.join(postDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  return {
    id,
    ...matterResult.data,
  }
} */

export async function getPostDataRemark(id) {
  const fullPath = path.join(postDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath, 'utf8');

  // Gray-matter парсит пост на секции с методанными.
  const matterResult = matter(fileContent);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  
  // Обращаем HTML в строку.
  const contentHtml = processedContent.toString();

  // Объединение данных с идентификатором и contentHTML
  return {
    id,
    contentHtml,
    ...matterResult.data,
  }
}