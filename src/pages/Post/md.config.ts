import MarkdownIt from 'markdown-it';
//@ts-ignore
import MarkdownItSub from 'markdown-it-sub';
//@ts-ignore
import MarkdownItSup from 'markdown-it-sup';
//@ts-ignore
import MarkdownItFootnote from 'markdown-it-footnote';
//@ts-ignore
import MarkdownItTaskList from 'markdown-it-task-lists';
//@ts-ignore
import MarkdownItContainer from 'markdown-it-container';
import type Token from 'markdown-it/lib/token';
import hljs from 'highlight.js';
//@ts-ignore
const mdParser = new MarkdownIt({
  //code语法高亮和样式
  highlight: (str, lang) => {
    let preCode = '';
    if (lang && hljs.getLanguage(lang)) {
      try {
        preCode = hljs.highlight(str, {
          language: lang,
          ignoreIllegals: true,
        }).value;
      } catch {
        preCode = mdParser.utils.escapeHtml(str);
      }
    } else {
      preCode = mdParser.utils.escapeHtml(str);
    }
    // 以换行进行分割
    const lines = preCode.split(/\n/).slice(0, -1);
    // 添加自定义行号
    let html = lines
      .map((item, index) => {
        return (
          '<li><span class="line-num" data-line="' +
          (index + 1) +
          '"></span>' +
          item +
          '</li>'
        );
      })
      .join('');
    html = '<ol>' + html + '</ol>';
    return `<pre class="highlight">
               <div class="highlight-tools">
                 <div class="code-lang">${lang || 'CODE'}</div>
                 <i class="fa fa-paste copy-button link"></i>
                 <i class="fa fa-angle-down expand_tools link expand_btn"></i>
               </div>
               <div class="highlight-code">${html}
               ${
                 lines.length > 10
                   ? '<div class="expand_content link expand_btn"><i class="fa fa-fw fa-chevron-down"></i></div>'
                   : ''
               }</div>
             </pre>`;
  },
});
mdParser
  .use(MarkdownItSub)
  .use(MarkdownItSup)
  .use(MarkdownItFootnote)
  .use(MarkdownItTaskList)
  //自定义语法notice
  /**
   * 用法
   * ::: notice [type||颜色]
   * 内容
   * :::
   */
  .use(MarkdownItContainer, 'notice', {
    validate: (params: string) => {
      const paramsAry = params.split(/ +/).filter((i) => !!i);
      if (paramsAry[0] === 'notice') return true;
      return false;
    },
    render: (tokens: Token[], idx: number) => {
      if (tokens[idx].nesting === 1) {
        const { info } = tokens[idx];
        const types = ['primary', 'warning', 'success', 'info', 'error'];
        const paramsAry = info.split(/ +/).filter((i) => !!i);
        if (paramsAry[1]) {
          if (types.includes(paramsAry[1])) {
            return `<div class="notice fa-fb ${paramsAry[1]}">`;
          }
        }
        return '<div class="notice fa-fb">';
      }
      return '</div>\n';
    },
  });

//H标签增加id为content
mdParser.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
  const curToken = tokens[idx];
  if (curToken.nesting === 1) {
    curToken.attrPush(['class', 'directory_title']);
    const content = tokens[idx + 1].content;
    const repeatedContents = tokens
      .map((i, index) => ({ idx: index, ...i }))
      .filter((i) => i.nesting === 0 && i.content === content);
    if (repeatedContents.length > 1) {
      const suffix = repeatedContents.findIndex((i) => i.idx === idx + 1) + 1;
      curToken.attrPush(['id', content + '-' + suffix]);
    } else {
      curToken.attrPush(['id', content]);
    }
  }
  return self.renderToken(tokens, idx, options);
};
//自定义语法tag  用法$[type]内容$
mdParser.renderer.rules.text = (tokens, idx) => {
  const content = mdParser.utils.escapeHtml(tokens[idx].content);
  return content.replace(
    /\$(\[((success)|(warning)|(error)|(info)|(primary))\])? *([\w\W]+) *\$/g,
    '<span class="tag $2">$8</span>',
  );
};
//设置所有a标签的target为_blank
mdParser.renderer.rules.link_open = (tokens, idx, options, _env, self) => {
  const targetIdx = tokens[idx].attrIndex('target');
  if (targetIdx < 0) {
    tokens[idx].attrPush(['target', '_blank']);
  } else {
    // @ts-ignore
    // eslint-disable-next-line no-param-reassign
    tokens[idx].attrs[targetIdx][1] = '_blank';
  }
  return self.renderToken(tokens, idx, options);
};
//为所有img标签增加data-fancybox
mdParser.renderer.rules.image = (tokens, idx) => {
  const src = tokens[idx].attrs?.find((i) => i[0] === 'src');
  const alt = tokens[idx].content;
  if (src) {
    return `<a href="${src[1]}" data-fancybox="group" data-caption="${
      alt || '图片'
    }" class="fancybox"><img src="${src[1]}" alt="${alt}" /></a>`;
  }
  return `<img />`;
};

mdParser.renderer.rules.table_open = (tokens, idx) => {
  const spareTokens = tokens.slice(idx);
  const tableCloseIdx = spareTokens.findIndex((i) => i.type === 'table_close');
  const thTokens = spareTokens.slice(0, tableCloseIdx);
  let width = 0;
  thTokens.forEach((i, index) => {
    if (i.type === 'th_open') {
      const content = thTokens[index + 1].content;
      const cLen = content.replace(/[1-9a-zA-Z/s]/g, '').length;
      width += cLen * 30 + (content.length - cLen) * 10;
    }
  });
  return `<div class="table-warp"><table style="width:${width}px">`;
};
mdParser.renderer.rules.table_close = () => {
  return '</table></div>';
};

mdParser.renderer.rules.ordered_list_open = (
  tokens,
  idx,
  options,
  _env,
  self,
) => {
  tokens[idx].attrPush(['class', 'order_list']);
  return self.renderToken(tokens, idx, options);
};

export default mdParser;
