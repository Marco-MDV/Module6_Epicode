import React from "react";
import { Col, Row } from "react-bootstrap";
import posts from "../../../data/posts.json";
import BlogItem from "../blog-item/BlogItem";
import Loader from "../../loader/Loader";
import NotFound from "../../notFound/NotFound";

const BlogList = props => {
  return (
    <>
      {posts.map((post, i) => (
        <Col
          key={`item-${i}`}
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem key={post.title} {...post} />
        </Col>
      ))}
      {props.loader &&
        <Col>
          <div className="w-100 h-100 d-flex justify-content-center align-items-center ">
            <Loader />
          </div>
        </Col>
      }
      {props.error &&
        <Col>
          <div className="w-100 h-100 d-flex justify-content-center align-items-center ">
            <NotFound/>
          </div>
        </Col>
      }
    </>
  );
};

export default BlogList;
