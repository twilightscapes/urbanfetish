import React from "react"

const BlogPreview = ({ entry }) => {
  console.log(entry.toJS())
  const title = entry.getIn(["data", "title"])
  const date = entry.getIn(["data", "date"])
  const body = entry.getIn(["data", "body"])

  return (
    <div>
      <h1>{title}</h1>
      <p>{date}</p>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  )
}

export default BlogPreview
