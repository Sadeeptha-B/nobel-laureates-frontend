import { useCallback, useContext, useEffect, useState } from "react";
import Input, { InputType } from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import {
  getCommentsByLaureateId,
  postComment,
} from "../../shared/api/comments-api";
import { Comment } from "../../models/Comment";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";

type CommentSectionProps = {
  laureateId: string | undefined;
};

type CommentState = {
  value: string;
  isValid: boolean;
};

const initialCommentState: CommentState = {
  value: "",
  isValid: false,
};

const CommentSection = (props: CommentSectionProps) => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [currCommentState, setCurrCommentState] =
    useState<CommentState>(initialCommentState);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (!props.laureateId) {
        return;
      }

      try {
        const comments: Comment[] = await getCommentsByLaureateId(
          props.laureateId
        );
        console.log(comments);
        setComments(comments);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const submitHandler = async (e: any) => {
    e.preventDefault();

    try {
      let newComment = await postComment(
        auth.userId!,
        props.laureateId!,
        currCommentState.value
      );
      setComments([...comments, newComment]);
    } catch (error) {
      console.log(error);
    }
  };

  const commentInputHandler = useCallback(
    (_: string, value: string, isValid: boolean) => {
      setCurrCommentState({
        value,
        isValid,
      });
    },
    []
  );

  return (
    <>
      <h3 className="m-6 text-xl font-bold leading-none text-gray-900 dark:text-white">
        Comments
      </h3>
      {isLoading && (
        <div className="m-10 flex items-center justify-center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      <div>
        <div className="m-10">
          {/* <div className="flex flex-col items-start gap-2.5 border border-gray-300 shadow-md rounded-lg p-5"> */}
          {comments.map((c, i) => (
            <div
              key={i}
              className="flex flex-col items-start gap-2.5 border border-gray-300 shadow-md rounded-lg p-5"
            >
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  Bonnie Green
                </span>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {new Date(c.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-sm font-normal py-2 text-gray-900 dark:text-white">
                {" "}
                {c.content}
              </p>
            </div>
          ))}
          {/* </div> */}
        </div>
      </div>
      <form className="m-10" onSubmit={submitHandler}>
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <Input
              element={InputType.Textarea}
              label="Your comment"
              id="comment"
              validators={[VALIDATOR_REQUIRE()]}
              placeholder="Write a comment..."
              errorText=".."
              onInput={commentInputHandler}
              type="text"
            />
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button
              type="submit"
              className="inline-flex items-center disabled:bg-blue-400 dark:disabled:bg-blue-500 py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
              disabled={!currCommentState.isValid}
            >
              Post comment
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CommentSection;
