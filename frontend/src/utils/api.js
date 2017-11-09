import { params } from './helpers';

const baseUrl = 'http://localhost:3001';

export function fetchCategories() {
    return fetch(`${baseUrl}/categories`, params)
        .then(res => res.json())
        .then(res => res.categories);
}

export function fetchPosts() {
    return fetch(`${baseUrl}/posts`, params)
        .then(res => res.json())
        .then(posts => {
            // get comments for each post (for displaying comments count)
            let promiseList = [];
            for (let post of posts) {
                promiseList.push(
                    fetch(`${baseUrl}/posts/${post.id}/comments`, params)
                        .then(res => res.json())
                        .then(res => {
                            post.commentsCount = res.length;
                            return post;
                        })
                )
            }
            return Promise.all(promiseList).then(posts => posts);
        });
}

export function fetchPostsByCategory(category) {
    return fetch(`${baseUrl}/${category}/posts`, params)
        .then(res => res.json())
        .then(posts => {
            let promiseList = [];
            for (let post of posts) {
                promiseList.push(
                    fetch(`${baseUrl}/posts/${post.id}/comments`, params)
                        .then(res => res.json())
                        .then(res => {
                            post.commentsCount = res.length;
                            return post;
                        })
                )
            }
            return Promise.all(promiseList).then(posts => posts);
        });
}

export function fetchPost(postId) {
    return fetch(`${baseUrl}/posts/${postId}`, params)
        .then(res => res.json());
}

export function fetchComments(postId) {
    return fetch(`${baseUrl}/posts/${postId}/comments`, params)
        .then(res => res.json());
}

export function apiAddPost(postObj) {
    return fetch(`${baseUrl}/posts`, { ...params, method: 'POST', body: JSON.stringify(postObj)});
}

export function apiAddComment(commentObj) {
    return fetch(`${baseUrl}/comments`, { ...params, method: 'POST', body: JSON.stringify(commentObj)});
}

export function apiDeleteComment(commentId) {
    return fetch(`${baseUrl}/comments/${commentId}`, {...params, method: 'DELETE'});
}

export function apiUpdatePostScore(changePostScoreObj) {
    const { postId, option } = changePostScoreObj;
    const payload = { option };
    return fetch(`${baseUrl}/posts/${postId}`, {...params, method: 'POST', body: JSON.stringify(payload)});
}

export function apiDeletePost(postId) {
    return fetch(`${baseUrl}/posts/${postId}`, {...params, method: 'DELETE'});
}

export function apiUpdateCommentScore(changeCommentScoreObj) {
    const { commentId, option } = changeCommentScoreObj;
    const payload = { option };
    return fetch(`${baseUrl}/comments/${commentId}`, {...params, method: 'POST', body: JSON.stringify(payload)});
}

export function apiEditPost(editPostObj) {
    const { id, title, body } = editPostObj;
    const payload = { title, body };
    return fetch(`${baseUrl}/posts/${id}`, {...params, method: 'PUT', body: JSON.stringify(payload)});
}

export function apiEditComment(commentObj) {
    const { id, title, body } = commentObj;
    const payload = { title, body };
    return fetch(`${baseUrl}/comments/${id}`, {...params, method: 'PUT', body: JSON.stringify(payload)});
}
