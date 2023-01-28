import { writable } from 'svelte/store';
import { Environment, Settings, UpdateSettings, UpdateViewStore, Views } from '../wailsjs/go/app/App';

export const busy = (() => {
  const { update, subscribe } = writable(0);

  subscribe(isBusy => {
    if (isBusy) {
      document.body.classList.add('busy');
    }
    else {
      document.body.classList.remove('busy');
    }
  });

  return {
    start: () => update(v => ++v),
    end: () => update(v => --v),
    subscribe,
  };
})();

export const contextMenu = (() => {
  const { set, subscribe } = writable();

  return {
    show: (evt, menu) => set(Object.keys(menu || {}).length ? {
      position: [ evt.clientX, evt.clientY ],
      items: menu,
    } : undefined),
    hide: () => set(undefined),
    subscribe,
  };
})();

export const connections = writable({});

export const applicationSettings = (() => {
  const { set, subscribe } = writable({});
  const reload = async() => {
    const newSettings = await Settings();
    set(newSettings);
    return newSettings;
  };

  reload();
  subscribe(newSettings => {
    UpdateSettings(JSON.stringify(newSettings || {}));
  });

  return { reload, set, subscribe };
})();

export const environment = (() => {
  const { set, subscribe } = writable({});
  const reload = async() => {
    const newEnv = await Environment();
    set(newEnv);
    console.log(newEnv);
    return newEnv;
  };

  reload();
  return { reload, subscribe };
})();

export const views = (() => {
  const { set, subscribe } = writable({});
  const reload = async() => {
    const newViewStore = await Views();
    set(newViewStore);
    return newViewStore;
  };

  reload();
  subscribe(newViewStore => {
    UpdateViewStore(JSON.stringify(newViewStore));
  });

  return { reload, set, subscribe };
})();
