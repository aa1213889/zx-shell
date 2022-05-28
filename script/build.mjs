#!/usr/bin/env zx

const base_file_path = "src/server/api/BASE.ts"
const ws_file_path = "src/server/ws.ts"
const highlight_file_path = "node_modules/highlight.js/types/index.d.ts"

//1. BASE.ts
let BASE_URL = await question('输入BASE_URL值: ')
let codeStr_base =
    `const BASE_URL = '${BASE_URL}'

export default BASE_URL`
await fs.writeFile(base_file_path, codeStr_base)
console.log('BASE_URL OK...')
await sleep(1000)

//2. ws.ts
let WS_URL = await question('输入BASE_WS_URL 的IP+端口(例如 192.168.1.1:8080 )  : ')
let verity = /(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d).(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d).(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d).(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d):(6553[0-5]|655[0-2]\d|65[0-4]\d{2}|6[0-4]\d{3}|[0-5]\d{4}|[1-9]\d{0,3})/.test(WS_URL)
if (!verity) throw new Error('Error: IP+端口不符合，请重新输入')
let codeStr_ws =
    `const BASE_WS_URL = '${WS_URL}'
export default BASE_WS_URL`
await fs.writeFile(ws_file_path, codeStr_ws)
console.log('WS OK...')
await sleep(1000)

// 3. highlight/types/index.d.ts
const codeStr =
    `/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
// For TS consumers who use Node and don't have dom in their tsconfig lib, import the necessary types here.
/// <reference lib="dom" />

declare module 'highlight.js/private' {
  import { CompiledMode, Mode, Language } from "highlight.js";

  type MatchType = "begin" | "end" | "illegal"
  type EnhancedMatch = RegExpMatchArray & {rule: CompiledMode, type: MatchType}
  type AnnotatedError = Error & {mode?: Mode | Language, languageName?: string, badRule?: Mode}

  type KeywordData = [string, number];
  type KeywordDict = Record<string, KeywordData>
}
declare module 'highlight.js' {

  import { KeywordDict } from "highlight.js/private";

  export type HLJSApi = PublicApi & ModesAPI

  export interface VuePlugin {
      install: (vue: any) => void
  }

  interface PublicApi {
      lineNumbersBlock: (element: HTMLElement, options: any) => void
      highlight: (codeOrLanguageName: string, optionsOrCode: string | HighlightOptions, ignoreIllegals?: boolean) => HighlightResult
      highlightAuto: (code: string, languageSubset?: string[]) => AutoHighlightResult
      highlightBlock: (element: HTMLElement) => void
      highlightElement: (element: HTMLElement) => void
      configure: (options: Partial<HLJSOptions>) => void
      initHighlighting: () => void
      initHighlightingOnLoad: () => void
      highlightAll: () => void
      registerLanguage: (languageName: string, language: LanguageFn) => void
      unregisterLanguage: (languageName: string) => void
      listLanguages: () => string[]
      registerAliases: (aliasList: string | string[], { languageName } : {languageName: string}) => void
      getLanguage: (languageName: string) => Language | undefined
      autoDetection: (languageName: string) => boolean
      inherit: <T>(original: T, ...args: Record<string, any>[]) => T
      addPlugin: (plugin: HLJSPlugin) => void
      debugMode: () => void
      safeMode: () => void
      versionString: string
      vuePlugin: () => VuePlugin
  }

  interface ModesAPI {
      SHEBANG: (mode?: Partial<Mode> & {binary?: string | RegExp}) => Mode
      BACKSLASH_ESCAPE: Mode
      QUOTE_STRING_MODE: Mode
      APOS_STRING_MODE: Mode
      PHRASAL_WORDS_MODE: Mode
      COMMENT: (begin: string | RegExp, end: string | RegExp, modeOpts?: Mode | {}) => Mode
      C_LINE_COMMENT_MODE: Mode
      C_BLOCK_COMMENT_MODE: Mode
      HASH_COMMENT_MODE: Mode
      NUMBER_MODE: Mode
      C_NUMBER_MODE: Mode
      BINARY_NUMBER_MODE: Mode
      REGEXP_MODE: Mode
      TITLE_MODE: Mode
      UNDERSCORE_TITLE_MODE: Mode
      METHOD_GUARD: Mode
      END_SAME_AS_BEGIN: (mode: Mode) => Mode
      // built in regex
      IDENT_RE: string
      UNDERSCORE_IDENT_RE: string
      MATCH_NOTHING_RE: string
      NUMBER_RE: string
      C_NUMBER_RE: string
      BINARY_NUMBER_RE: string
      RE_STARTERS_RE: string
  }

  export type LanguageFn = (hljs: HLJSApi) => Language
  export type CompilerExt = (mode: Mode, parent: Mode | Language | null) => void

  export interface HighlightResult {
      code?: string
      relevance : number
      value : string
      language? : string
      illegal : boolean
      errorRaised? : Error
      // * for auto-highlight
      secondBest? : Omit<HighlightResult, 'second_best'>
      // private
      _illegalBy? : illegalData
      _emitter : Emitter
      _top? : Language | CompiledMode
  }
  export interface AutoHighlightResult extends HighlightResult {}

  export interface illegalData {
      message: string
      context: string
      index: number
      resultSoFar : string
      mode: CompiledMode
  }

  export type BeforeHighlightContext = {
      code: string,
      language: string,
      result?: HighlightResult
  }
  export type PluginEvent = keyof HLJSPlugin;
  export type HLJSPlugin = {
      'after:highlight'?: (result: HighlightResult) => void,
      'before:highlight'?: (context: BeforeHighlightContext) => void,
      'after:highlightElement'?: (data: { el: Element, result: HighlightResult, text: string}) => void,
      'before:highlightElement'?: (data: { el: Element, language: string}) => void,
      // TODO: Old API, remove with v12
      'after:highlightBlock'?: (data: { block: Element, result: HighlightResult, text: string}) => void,
      'before:highlightBlock'?: (data: { block: Element, language: string}) => void,
  }

  interface EmitterConstructor {
      new (opts: any): Emitter
  }

  export interface HighlightOptions {
      language: string
      ignoreIllegals?: boolean
  }

  export interface HLJSOptions {
      noHighlightRe: RegExp
      languageDetectRe: RegExp
      classPrefix: string
      cssSelector: string
      languages?: string[]
      __emitter: EmitterConstructor
      ignoreUnescapedHTML?: boolean
      throwUnescapedHTML?: boolean
  }

  export interface CallbackResponse {
      data: Record<string, any>
      ignoreMatch: () => void
      isMatchIgnored: boolean
  }

  export type ModeCallback = (match: RegExpMatchArray, response: CallbackResponse) => void
  export type Language = LanguageDetail & Partial<Mode>
  export interface Mode extends ModeCallbacks, ModeDetails {}

  export interface LanguageDetail {
      name?: string
      unicodeRegex?: boolean
      rawDefinition?: () => Language
      aliases?: string[]
      disableAutodetect?: boolean
      contains: (Mode)[]
      case_insensitive?: boolean
      keywords?: Record<string, any> | string
      isCompiled?: boolean,
      exports?: any,
      classNameAliases?: Record<string, string>
      compilerExtensions?: CompilerExt[]
      supersetOf?: string
  }

  // technically private, but exported for convenience as this has
  // been a pretty stable API and is quite useful
  export interface Emitter {
      addKeyword(text: string, kind: string): void
      addText(text: string): void
      toHTML(): string
      finalize(): void
      closeAllNodes(): void
      openNode(kind: string): void
      closeNode(): void
      addSublanguage(emitter: Emitter, subLanguageName: string): void
  }

  export type HighlightedHTMLElement = HTMLElement & {result?: object, secondBest?: object, parentNode: HTMLElement}

  /* modes */

  interface ModeCallbacks {
      "on:end"?: Function,
      "on:begin"?: ModeCallback
  }

  export interface CompiledLanguage extends LanguageDetail, CompiledMode {
      isCompiled: true
      contains: CompiledMode[]
      keywords: Record<string, any>
  }

  export type CompiledScope = Record<number, string> & {_emit?: Record<number, boolean>, _multi?: boolean, _wrap?: string};

  export type CompiledMode = Omit<Mode, 'contains'> &
      {
          begin?: RegExp | string
          end?: RegExp | string
          scope?: string
          contains: CompiledMode[]
          keywords: KeywordDict
          data: Record<string, any>
          terminatorEnd: string
          keywordPatternRe: RegExp
          beginRe: RegExp
          endRe: RegExp
          illegalRe: RegExp
          matcher: any
          isCompiled: true
          starts?: CompiledMode
          parent?: CompiledMode
          beginScope?: CompiledScope
          endScope?: CompiledScope
      }

  interface ModeDetails {
      begin?: RegExp | string | (RegExp | string)[]
      match?: RegExp | string | (RegExp | string)[]
      end?: RegExp | string | (RegExp | string)[]
      className?: string
      scope?: string | Record<number, string>
      beginScope?: string | Record<number, string>
      endScope?: string | Record<number, string>
      contains?: ("self" | Mode)[]
      endsParent?: boolean
      endsWithParent?: boolean
      endSameAsBegin?: boolean
      skip?: boolean
      excludeBegin?: boolean
      excludeEnd?: boolean
      returnBegin?: boolean
      returnEnd?: boolean
      __beforeBegin?: Function
      parent?: Mode
      starts?:Mode
      lexemes?: string | RegExp
      keywords?: Record<string, any> | string
      beginKeywords?: string
      relevance?: number
      illegal?: string | RegExp | Array<string | RegExp>
      variants?: Mode[]
      cachedVariants?: Mode[]
      // parsed
      subLanguage?: string | string[]
      isCompiled?: boolean
      label?: string
  }

  const hljs : HLJSApi;
  export default hljs;

}

declare module 'highlight.js/lib/languages/*' {
  import { LanguageFn } from "highlight.js";
  const defineLanguage: LanguageFn;
  export default defineLanguage;
}`
await fs.writeFile(highlight_file_path, codeStr)
console.log('Highlight OK...')