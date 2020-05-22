<?php 
  $articles = getAllnews();
  foreach( $articles as $article) { $tags = explode(',', $article['tags'])?>
	<article>
		<header>
			<h3><a href="news_item.php?article_id=<?=$article['id']?>">
					<?=$article['title']?> </a></h3>
		</header>
		<img src="https://loremflickr.com/1200/600/<?=$tags[0]?>" alt="">
		<p>
			<?=$article['introduction']?>
		</p>
		<p>
			<?=$article['fulltext']?>
		</p>
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
			<a class="comments" href="news_item.php?article_id=<?=$article['id']?>"><?=$article['comments']?></a>
		</footer>
	</article>
<?php }?>
</section>