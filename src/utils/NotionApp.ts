import { Client } from '@notionhq/client';

import Page from './Page';

export default class NotionApp {
  notion: Client;

  constructor(token: string) {
    this.notion = new Client({ auth: token });
  }

  async getRootPages() {
    const response = await this.notion.search({
      query: '',
    });

    return response.results
      .filter((result: any) => result.parent.type === 'workspace')
      .map(
        (result: any) =>
          new Page(result.id, result.properties.title.title[0].plain_text)
      );
  }

  async getPageWordsRecursively(page: Page) {
    const blockId = page.id;
    const response = await this.notion.blocks.children.list({
      block_id: blockId,
    });

    const words = [];
    for (const result of response.results) {
      console.log('========================================');
      console.log(result);

      // @ts-ignore-line
      if (result.type === 'table') {
        console.log('==== BRX1');

        words.push(
          await new Promise(async (resolve, _reject) => {
            resolve(
              (await this.getPageWordsRecursively(new Page(result.id)))
                .filter((v: any) => v?.trim()?.length > 0)
                .join(' ')
            );
          })
        );

        // @ts-ignore-line
      } else if (result.type === 'table_row') {
        console.log('==== BRX2');
        console.log(result);

        words.push(
          await new Promise((resolve, _reject) => {
            resolve(
              // @ts-ignore-line
              NotionApp.getPlainTextFromTableRow(result.table_row?.cells)
            );
          })
        );

        // @ts-ignore-line
      } else if (result.type === 'child_page') {
        console.log('==== BRX3');
        words.push(
          await new Promise(async (resolve, _reject) => {
            resolve(
              // @ts-ignore-line
              result.child_page.title +
                ' ' +
                (await this.getPageWordsRecursively(new Page(result.id)))
                  .filter((v: any) => v?.trim()?.length > 0)
                  .join(' ')
            );
          })
        );
      } else {
        console.log('==== BRX4');
        words.push(
          await new Promise((resolve, _reject) => {
            // @ts-ignore-line
            resolve(NotionApp.getPlainText(result[result.type]?.text));
          })
        );
      }
    }

    return words;
  }

  static getPlainText(text: any) {
    return text
      ?.map((txt: any) => {
        return txt?.plain_text;
      })
      .join('');
  }

  static getPlainTextFromTableRow(cells: any) {
    return cells
      ?.map((cell: any) => {
        return cell.map((txt: any) => txt.plain_text).join('');
      })
      .join(' ');
  }

  async getPageNbOfWords(page: Page) {
    const pageWords: any = await this.getPageWordsRecursively(page);

    console.log('FINAL');
    console.log(pageWords);
    console.log('==== FINAL');

    const temp = pageWords
      .join(' ')
      .split(' ')
      .filter((v: any) => v?.trim()?.length > 0);

    console.log('FINAL');
    console.log(temp);
    console.log('==== FINAL');

    return temp.length;
  }

  static getUUID(pageId: string) {
    // TODO: USE SUBSTRING FROM LAST
    const temp = pageId.split('-');
    return temp[temp.length - 1];
  }
}
