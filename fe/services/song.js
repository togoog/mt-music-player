import request from './request.js';
import { store, updateStore } from '../models/index.js';
import config from '../config/index.js';

export const get = async () => {
  const list = await request('/songs');
  updateStore('songData', { list: list.map(e => ({ ...e, src: `//${config.storage}/${e.src}` })) });
};

export const upload = (files) => {
  const fileArr = Array.from(files);
  updateStore('uploaderState', {
    list: store.uploaderState.list.concat(fileArr.map(file => ({ file }))),
  });

  fileArr.forEach(async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const data = await request('/songs', { method: 'post', body: formData });

    const { list } = store.uploaderState;
    const uploadedIndex = list.findIndex(({ file: f }) => file === f);
    list.splice(uploadedIndex, 1);
    updateStore('uploaderState', { list });
    updateStore('songData', {
      list: store.songData.list.concat({ ...data, src: `//${config.storage}/${data.src}` }),
    });
  });
};

export const del = async (id) => {
  const { list } = store.songData;
  await request(`/songs/${id}`, { method: 'delete' });
  const deletedIndex = list.findIndex(({ id: i }) => i === id);
  list.splice(deletedIndex, 1);
  updateStore('songData', { list });
};

export const update = async (id, song) => {
  const { list } = store.songData;
  await request(`/songs/${id}`, { method: 'put', body: JSON.stringify(song) });
  Object.assign(list.find(({ id: i }) => i === id), song);
  updateStore('songData', { list });
};
