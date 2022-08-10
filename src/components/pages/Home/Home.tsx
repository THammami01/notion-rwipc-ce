import { FC, useEffect } from 'react';

import NotionApp from '../../../utils/NotionApp';
import Page from '../../../utils/Page';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') document.body.classList.add('custom-dark-theme');

    const integrationToken = localStorage.getItem('integration-token');
    if (integrationToken)
      (document.getElementById('integration-token') as any).value =
        integrationToken;

    const pageId = localStorage.getItem('page-id');
    if (pageId) (document.getElementById('page-id') as any).value = pageId;
  }, []);

  const handleThemeSwitcherClick = () => {
    if (document.body.classList.contains('custom-dark-theme')) {
      document.body.classList.remove('custom-dark-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.add('custom-dark-theme');
      localStorage.setItem('theme', 'dark');
    }
  };

  const hanldeIntegrationTokenChange = (e: any) => {
    localStorage.setItem('integration-token', e.target.value);
  };

  const handlePageIdChange = (e: any) => {
    localStorage.setItem('page-id', e.target.value);
  };

  const handleCountClick = async () => {
    const integrationToken = (
      document.getElementById('integration-token') as any
    ).value;
    const pageId = (document.getElementById('page-id') as any).value;

    (document.getElementById('result') as any).style.display = 'none';
    (document.getElementById('loading-spinner') as any).style.display =
      'inline-block';

    try {
      console.log(integrationToken, pageId);

      if (!integrationToken || !pageId) {
        throw Error('Invalid entries.');
      } else {
        const notion = new NotionApp(integrationToken);

        const nbOfWords = await notion.getPageNbOfWords(
          new Page(NotionApp.getUUID(pageId))
        );
        console.log(nbOfWords);

        (document.getElementById('result') as any).innerHTML = nbOfWords;
      }
    } catch (err) {
      console.error('Error: ', err);
      (document.getElementById('result') as any).innerHTML = 'Error';
    }

    (document.getElementById('result') as any).style.display = 'initial';
    (document.getElementById('loading-spinner') as any).style.display = 'none';
  };

  return (
    <>
      <div className="modal-header">
        <h1 className="logo">
          <img className="logo-icon" src="icon.png" />
          <span>Words-in-Page Counter</span>
        </h1>
      </div>

      <div className="modal-content">
        <p>Count the number of words in a Notion page and its sub-pages.</p>
      </div>

      <div className="modal-icons">
        <div className="flex-container custom-form">
          <div>
            <label htmlFor="integration-token">Integration Token *</label>
            <input
              id="integration-token"
              type="password"
              onChange={hanldeIntegrationTokenChange}
            />
          </div>

          <div>
            <label htmlFor="page-id">Page ID *</label>
            <input id="page-id" type="text" onChange={handlePageIdChange} />
          </div>

          <div>
            <button id="count" onClick={handleCountClick}>
              Count
            </button>
          </div>

          <div className="last-row">
            <p>
              Result: <span id="result">N/A</span>
              <div id="loading-spinner" className="lds-facebook">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </p>

            <div className="imgs">
              <img
                src="https://img.icons8.com/ios-glyphs/30/000000/change-theme.png"
                title="Switch theme"
                id="theme-switcher"
                onClick={handleThemeSwitcherClick}
              />

              <a
                href="https://github.com/THammami01/notion-recursive-words-in-page-counter"
                target="_blank"
              >
                <img
                  src="https://img.icons8.com/ios-glyphs/30/000000/github.png"
                  title="@THammami01"
                  id="theme-switcher"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
