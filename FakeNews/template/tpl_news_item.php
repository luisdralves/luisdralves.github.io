<?php
  $article = getNews($_GET['article_id']);
  //$comments = getComments($_GET['article_id']);

  $stmt = $db->prepare('SELECT * FROM comments JOIN users USING (username) WHERE news_id = ?');
  $stmt->execute(array($_GET['article_id']));
  $comments = $stmt->fetchAll();

  $tags = explode(',', $article['tags']);
?>
<article>
	<header>
		<h3><a href="list_news.php"><?=$article['title']?></a></h3>
	</header>
	<img src="https://loremflickr.com/1200/600/<?=$tags[0]?>" alt="">
	<p>
		<?=$article['introduction']?>
	</p>
	<p>
		<?=$article['fulltext']?>
	</p>


	<section id="comments">
		<h3><?=count($comments)?> comments</h3>
		<?php foreach( $comments as $comment) {?>
        	<article class="comment">
            	<span class="user"><?=$comment['username']?></span>
            	<span class="date"><?=date('Y-m-d h:s', $comment['published'])?></span>
				<p><?=$comment['text']?>
			</article>
		<?php } ?>
    </section>



	<footer>
		<span class="author">
			<?=fetchAuthorName($article['username'])?></span>
		<span class="tags">
            <?php 
                $i = 1;
                foreach( $tags as $tag) {
                    echo '<a href="list_news.php"> #', $tag, '</a>';
                    if($i !== count($tags))
                        echo ', ';
                    $i++;
             }?>  </span>
		<span class="date">
			<?=date('Y-m-d h:s', $article['published'])?></span>
		<a class="comments" href="news_item.php?aritcle_id=<?=$article['id']?>"><?=count($comments)?></a>
	</footer>
</article>