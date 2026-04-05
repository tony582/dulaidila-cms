#!/bin/bash
# 百度主动推送脚本 — 每天自动把所有已发布文章 URL 推送给百度
# 使用方式：bash /var/www/dulaidila-cms/scripts/baidu_push.sh
# 建议加入 crontab：0 8 * * * bash /var/www/dulaidila-cms/scripts/baidu_push.sh >> /var/log/baidu_push.log 2>&1

SITE="https://dulaidila.com"
TOKEN="GsC4EYEXHSXT6GnT"
BAIDU_API="http://data.zz.baidu.com/urls?site=${SITE}&token=${TOKEN}"

echo "[$(date)] 开始百度推送..."

# 从线上 sitemap 解析所有 URL
URLS=$(curl -s "${SITE}/sitemap.xml" | grep -o '<loc>[^<]*</loc>' | sed 's/<[^>]*>//g')

if [ -z "$URLS" ]; then
  echo "[$(date)] 错误：无法获取 sitemap，退出"
  exit 1
fi

URL_COUNT=$(echo "$URLS" | wc -l | tr -d ' ')
echo "[$(date)] 共发现 ${URL_COUNT} 个 URL，开始推送..."

# 推送并记录结果
RESULT=$(echo "$URLS" | curl -s -H 'Content-Type:text/plain' \
  --data-binary @- \
  "${BAIDU_API}")

echo "[$(date)] 百度返回：${RESULT}"

# 解析结果
if echo "$RESULT" | grep -q '"success"'; then
  SUCCESS=$(echo "$RESULT" | grep -o '"success":[0-9]*' | grep -o '[0-9]*')
  REMAIN=$(echo "$RESULT" | grep -o '"remain":[0-9]*' | grep -o '[0-9]*')
  echo "[$(date)] ✅ 成功推送 ${SUCCESS} 条，今日剩余配额 ${REMAIN} 条"
else
  echo "[$(date)] ⚠️  推送出错：${RESULT}"
fi
