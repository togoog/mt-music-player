import request from '../lib/request.js';
import { store, updateStore } from '../models/index.js';
import { toQuerystring } from '../utils/object.js';

export const get = async () => {
  const list = await request('/songs');
  updateStore('songData', { list });
  return list;
};

export const upload = (files) => {
  const fileArr = Array.from(files);
  updateStore('uploaderState', {
    list: store.uploaderState.list.concat(fileArr.map(file => ({ file }))),
    errorList: [],
  });

  fileArr.forEach(async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    let error;
    let data;
    try {
      data = await request('/songs', { method: 'post', body: formData });
    } catch (e) {
      error = true;
    }

    const { list, errorList } = store.uploaderState;
    const uploadedIndex = list.findIndex(({ file: f }) => file === f);
    const uploadedItem = list.splice(uploadedIndex, 1);
    if (error) {
      updateStore('uploaderState', { list, errorList: errorList.concat(uploadedItem) });
    } else {
      updateStore('uploaderState', { list });
      updateStore('songData', {
        list: [data].concat(store.songData.list),
      });
    }
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
  const { currentSong } = store.playerState;
  const data = await request(`/songs/${id}`, { method: 'put', body: song });
  Object.assign(list.find(({ id: i }) => i === id), data, { picture: data.picture || undefined });
  updateStore('songData', { list });
  if (currentSong === id) {
    updateStore('playerState', {});
  }
};

export const search = async (text) => {
  const list = await request(`/search?${toQuerystring({ q: text, type: 'song' })}`);
  updateStore('searchData', { list, text });
};
