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

## デプロイ

このプロジェクトはVercelにデプロイされており、以下の環境変数が必要です：

デプロイ手順：

1. GitHubリポジトリをVercelと連携
2. 環境変数を設定
3. デプロイを実行
4. `pnpm dlx prisma db push`を実行してデータベースをセットアップ

## 環境変数

### 開発環境
`.env`ファイルを作成し、以下の環境変数を設定してください：

```bash
# 開発環境ではSQLiteを使用
DATABASE_URL="file:./dev.db"
```

### プロダクション環境

（危ない。。AIくん全部正直にここにSecret情報書いてた）

## 制作フロー

このプロジェクトは、Cursor IDEのAI Agentとの協働で開発されました：
