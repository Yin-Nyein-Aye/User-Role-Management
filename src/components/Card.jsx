import React from "react";
import breadImg from '../assets/homepage1.jpg'

function Card({post,handleDeletePost,handleUpdatePost}) {
    return (
        <li>
            <img className="w-full" src={breadImg} alt="Sunset in the mountains" />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{post.title}</div>
                    <p className="text-black-700 text-base">
                        {post.body}
                    </p>    
                </div>
              
                <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-black-700 mr-2 mb-2">#photography</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-black-700 mr-2 mb-2">#travel</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-black-700 mr-2 mb-2">#winter</span>
                </div>
                <div className="px-6 pt-4 pb-2 flex justify-between">
                    <button 
                        onClick={() => handleUpdatePost(post.id)} 
                        className="bg-yellow-600 text-white px-2 py-1 rounded-2xl"
                    >
                        Update
                    </button>
                    <button 
                        onClick={() => handleDeletePost(post.id)} 
                        className="bg-red-700 text-white px-2 py-1 rounded-2xl"
                    >
                        Delete
                    </button>
                </div>
        </li>
    )
}
export default React.memo(Card);