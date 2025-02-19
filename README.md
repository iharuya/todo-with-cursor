# Todo With Cursor

モダンなUIとスムーズなUXを備えた、Next.js App RouterベースのTODOアプリケーション。

## 特徴

- 🎨 美しいUI/UX
  - Shadcn UIコンポーネント
  - Tailwind CSSによるスタイリング
  - レスポンシブデザイン
  - ダークモード対応
  - アニメーションとトランジション効果

- 📋 TODOの管理機能
  - TODOの作成、編集、削除
  - 完了状態の切り替え
  - カテゴリによる分類
  - カテゴリフィルタリング

- 🎨 カテゴリ管理機能
  - カスタムカラーの設定
  - カテゴリの作成、編集、削除
  - デフォルトカテゴリの保護機能

- ⚡ 最新技術スタック
  - Next.js 15 (App Router)
  - React 19
  - TypeScript
  - Prisma (SQLite)
  - Radix UI
  - Tailwind CSS

## 開発環境のセットアップ

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/todo-with-cursor.git
cd todo-with-cursor

# 依存関係のインストール
pnpm install

# Prismaの初期設定
pnpm dlx prisma generate
pnpm dlx prisma db push

# 開発サーバーの起動
pnpm dev
```

## 環境変数

`.env`ファイルを作成し、以下の環境変数を設定してください：

```
DATABASE_URL="file:./dev.db"
```

## 制作フロー

このプロジェクトは、Cursor IDEのAI Agentとの協働で開発されました：

1. AI Agentが以下を実装：
   - プロジェクトの基本構造とセットアップ
   - データベーススキーマの設計
   - UIコンポーネントの実装
   - サーバーアクションの実装
   - スタイリングとアニメーション

2. 人間のエンジニアの貢献：
   - 型定義の微調整とインポートエラーの修正
   - 最終的な動作確認とテスト

## ディレクトリ構造

```
src/
├── app/
│   ├── actions/
│   │   └── todo.ts      # サーバーアクション
│   ├── layout.tsx       # ルートレイアウト
│   └── page.tsx         # メインページ
├── components/
│   ├── ui/              # 基本UIコンポーネント
│   ├── todo-item.tsx    # TODOアイテムコンポーネント
│   ├── todo-list.tsx    # TODOリストコンポーネント
│   └── ...             # その他のコンポーネント
├── lib/
│   └── prisma.ts        # Prismaクライアント
└── types/               # 型定義
```

## ライセンス

MIT

## 作者

- AI Agent (Cursor IDE) - メイン実装
- あなたの名前 - プロジェクトオーナー、デバッグ
